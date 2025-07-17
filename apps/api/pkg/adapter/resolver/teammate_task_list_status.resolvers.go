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

func (r *mutationResolver) CreateTeammateTaskListStatus(ctx context.Context, input ent.CreateTeammateTaskListStatusInput) (*ent.TeammateTaskListStatus, error) {
	t, err := r.controller.TeammateTaskListStatus.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) UpdateTeammateTaskListStatus(ctx context.Context, input ent.UpdateTeammateTaskListStatusInput) (*ent.TeammateTaskListStatus, error) {
	t, err := r.controller.TeammateTaskListStatus.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TeammateTaskListStatusUpdated {
			if u.ID == t.ID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TeammateTaskListStatus(ctx context.Context, where *ent.TeammateTaskListStatusWhereInput) (*ent.TeammateTaskListStatus, error) {
	t, err := r.controller.TeammateTaskListStatus.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TeammateTaskListStatuses(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TeammateTaskListStatusWhereInput) (*ent.TeammateTaskListStatusConnection, error) {
	ts, err := r.controller.TeammateTaskListStatus.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TeammateTaskListStatusUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.TeammateTaskListStatus, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTaskListStatus, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskListStatusUpdated[key] = subscription.TeammateTaskListStatusUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskListStatusUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *teammateTaskListStatusResolver) CreatedAt(ctx context.Context, obj *ent.TeammateTaskListStatus) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *teammateTaskListStatusResolver) UpdatedAt(ctx context.Context, obj *ent.TeammateTaskListStatus) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TeammateTaskListStatus returns generated.TeammateTaskListStatusResolver implementation.
func (r *Resolver) TeammateTaskListStatus() generated.TeammateTaskListStatusResolver {
	return &teammateTaskListStatusResolver{r}
}

type teammateTaskListStatusResolver struct{ *Resolver }
