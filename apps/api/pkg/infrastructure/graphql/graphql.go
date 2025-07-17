package graphql

import (
	"context"
	"net/http"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/adapter/controller"
	"project-management-demo-backend/pkg/adapter/resolver"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/util/auth"
	"time"

	"entgo.io/contrib/entgql"

	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gorilla/websocket"

	"github.com/99designs/gqlgen/graphql/handler"
)

// NewServer generates graphql server
func NewServer(client *ent.Client, controller controller.Controller) *handler.Server {
	// Add extensions to error
	// @see https://github.com/99designs/gqlgen/issues/1354
	srv := handler.New(resolver.NewSchema(client, controller))

	// Configure WebSocket with CORS
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
		},
		KeepAlivePingInterval: 10 * time.Second,
		InitFunc: func(ctx context.Context, initPayload transport.InitPayload) (context.Context, error) {
			authClient, err := auth.NewClient(ctx)
			if err != nil {
				return ctx, model.NewAuthError(err)
			}

			authorization := initPayload.Authorization()
			idToken := auth.GetIDTokenFromBearer(authorization)
			token, err := authClient.VerifyIDToken(ctx, idToken)
			if err != nil {
				return ctx, model.NewAuthError(err)
			}

			ctx = auth.WithToken(ctx, token)

			return ctx, nil
		},
	})

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New(1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	srv.Use(entgql.Transactioner{TxOpener: client})

	return srv
}
