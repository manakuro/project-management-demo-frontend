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

func (r *mutationResolver) CreateTag(ctx context.Context, input ent.CreateTagInput) (*ent.Tag, error) {
	t, err := r.controller.Tag.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) UpdateTag(ctx context.Context, input ent.UpdateTagInput) (*ent.Tag, error) {
	t, err := r.controller.Tag.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TagUpdated {
			if u.ID == t.ID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) Tag(ctx context.Context, where *ent.TagWhereInput) (*ent.Tag, error) {
	t, err := r.controller.Tag.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) Tags(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TagWhereInput) (*ent.TagConnection, error) {
	ts, err := r.controller.Tag.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TagUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.Tag, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.Tag, 1)

	r.mutex.Lock()
	r.subscriptions.TagUpdated[key] = subscription.TagUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TagUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *tagResolver) CreatedAt(ctx context.Context, obj *ent.Tag) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *tagResolver) UpdatedAt(ctx context.Context, obj *ent.Tag) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// Tag returns generated.TagResolver implementation.
func (r *Resolver) Tag() generated.TagResolver { return &tagResolver{r} }

type tagResolver struct{ *Resolver }
