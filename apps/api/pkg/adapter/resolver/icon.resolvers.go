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

func (r *iconResolver) CreatedAt(ctx context.Context, obj *ent.Icon) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *iconResolver) UpdatedAt(ctx context.Context, obj *ent.Icon) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateIcon(ctx context.Context, input ent.CreateIconInput) (*ent.Icon, error) {
	i, err := r.controller.Icon.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return i, nil
}

func (r *mutationResolver) UpdateIcon(ctx context.Context, input ent.UpdateIconInput) (*ent.Icon, error) {
	i, err := r.controller.Icon.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.IconUpdated {
			if u.ID == i.ID && u.RequestID != input.RequestID {
				u.Ch <- i
			}
		}
	}()

	return i, nil
}

func (r *queryResolver) Icon(ctx context.Context, id ulid.ID) (*ent.Icon, error) {
	i, err := r.controller.Icon.Get(ctx, id)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return i, nil
}

func (r *queryResolver) Icons(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.IconWhereInput) (*ent.IconConnection, error) {
	is, err := r.controller.Icon.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return is, nil
}

func (r *subscriptionResolver) IconUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.Icon, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.Icon, 1)

	r.mutex.Lock()
	r.subscriptions.IconUpdated[key] = subscription.IconUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.IconUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// Icon returns generated.IconResolver implementation.
func (r *Resolver) Icon() generated.IconResolver { return &iconResolver{r} }

type iconResolver struct{ *Resolver }
