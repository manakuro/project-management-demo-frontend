package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/util/datetime"
	"project-management-demo-backend/pkg/util/subscription"
)

func (r *colorResolver) CreatedAt(ctx context.Context, obj *ent.Color) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *colorResolver) UpdatedAt(ctx context.Context, obj *ent.Color) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateColor(ctx context.Context, input ent.CreateColorInput) (*ent.Color, error) {
	c, err := r.controller.Color.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return c, nil
}

func (r *mutationResolver) UpdateColor(ctx context.Context, input ent.UpdateColorInput) (*ent.Color, error) {
	c, err := r.controller.Color.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.ColorUpdated {
			if u.ID == c.ID && u.RequestID != u.RequestID {
				u.Ch <- c
			}
		}
	}()

	return c, nil
}

func (r *queryResolver) Color(ctx context.Context, id ulid.ID) (*ent.Color, error) {
	c, err := r.controller.Color.Get(ctx, id)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return c, nil
}

func (r *queryResolver) Colors(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ColorWhereInput) (*ent.ColorConnection, error) {
	cs, err := r.controller.Color.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return cs, nil
}

func (r *subscriptionResolver) ColorUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.Color, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.Color, 1)

	r.mutex.Lock()
	r.subscriptions.ColorUpdated[key] = subscription.ColorUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.ColorUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// Color returns generated.ColorResolver implementation.
func (r *Resolver) Color() generated.ColorResolver { return &colorResolver{r} }

type colorResolver struct{ *Resolver }
