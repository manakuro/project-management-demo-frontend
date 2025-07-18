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

func (r *mutationResolver) CreateTeammateTaskTabStatus(ctx context.Context, input ent.CreateTeammateTaskTabStatusInput) (*ent.TeammateTaskTabStatus, error) {
	t, err := r.controller.TeammateTaskTabStatus.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) UpdateTeammateTaskTabStatus(ctx context.Context, input ent.UpdateTeammateTaskTabStatusInput) (*ent.TeammateTaskTabStatus, error) {
	t, err := r.controller.TeammateTaskTabStatus.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TeammateTaskTabStatusUpdated {
			if u.ID == t.ID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TeammateTaskTabStatus(ctx context.Context, where *ent.TeammateTaskTabStatusWhereInput) (*ent.TeammateTaskTabStatus, error) {
	t, err := r.controller.TeammateTaskTabStatus.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TeammateTaskTabStatuses(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TeammateTaskTabStatusWhereInput) (*ent.TeammateTaskTabStatusConnection, error) {
	ts, err := r.controller.TeammateTaskTabStatus.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TeammateTaskTabStatusUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.TeammateTaskTabStatus, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTaskTabStatus, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskTabStatusUpdated[key] = subscription.TeammateTaskTabStatusUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskTabStatusUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *teammateTaskTabStatusResolver) CreatedAt(ctx context.Context, obj *ent.TeammateTaskTabStatus) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *teammateTaskTabStatusResolver) UpdatedAt(ctx context.Context, obj *ent.TeammateTaskTabStatus) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TeammateTaskTabStatus returns generated.TeammateTaskTabStatusResolver implementation.
func (r *Resolver) TeammateTaskTabStatus() generated.TeammateTaskTabStatusResolver {
	return &teammateTaskTabStatusResolver{r}
}

type teammateTaskTabStatusResolver struct{ *Resolver }
