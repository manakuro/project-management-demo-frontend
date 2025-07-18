package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/util/datetime"
	"project-management-demo-backend/pkg/util/subscription"
)

func (r *mutationResolver) CreateTaskFeedLike(ctx context.Context, input ent.CreateTaskFeedLikeInput) (*ent.TaskFeedLike, error) {
	t, err := r.controller.TaskFeedLike.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskFeedLikeCreated {
			if u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) UpdateTaskFeedLike(ctx context.Context, input ent.UpdateTaskFeedLikeInput) (*ent.TaskFeedLike, error) {
	t, err := r.controller.TaskFeedLike.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) DeleteTaskFeedLike(ctx context.Context, input model.DeleteTaskFeedLikeInput) (*ent.TaskFeedLike, error) {
	t, err := r.controller.TaskFeedLike.Delete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskFeedLikeDeleted {
			if u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TaskFeedLike(ctx context.Context, where *ent.TaskFeedLikeWhereInput) (*ent.TaskFeedLike, error) {
	t, err := r.controller.TaskFeedLike.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *queryResolver) TaskFeedLikes(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskFeedLikeWhereInput) (*ent.TaskFeedLikeConnection, error) {
	ts, err := r.controller.TaskFeedLike.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TaskFeedLikeCreated(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.TaskFeedLike, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskFeedLike, 1)

	r.mutex.Lock()
	r.subscriptions.TaskFeedLikeCreated[key] = subscription.TaskFeedLikeCreated{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskFeedLikeCreated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskFeedLikeDeleted(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.TaskFeedLike, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskFeedLike)

	r.mutex.Lock()
	r.subscriptions.TaskFeedLikeDeleted[key] = subscription.TaskFeedLikeDeleted{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskFeedDeleted, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *taskFeedLikeResolver) CreatedAt(ctx context.Context, obj *ent.TaskFeedLike) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskFeedLikeResolver) UpdatedAt(ctx context.Context, obj *ent.TaskFeedLike) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskFeedLike returns generated.TaskFeedLikeResolver implementation.
func (r *Resolver) TaskFeedLike() generated.TaskFeedLikeResolver { return &taskFeedLikeResolver{r} }

type taskFeedLikeResolver struct{ *Resolver }
