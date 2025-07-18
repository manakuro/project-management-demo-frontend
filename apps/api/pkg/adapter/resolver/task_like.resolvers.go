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

func (r *mutationResolver) CreateTaskLike(ctx context.Context, input ent.CreateTaskLikeInput) (*ent.TaskLike, error) {
	t, err := r.controller.TaskLike.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskLikesCreated {
			if u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) UpdateTaskLike(ctx context.Context, input ent.UpdateTaskLikeInput) (*ent.TaskLike, error) {
	t, err := r.controller.TaskLike.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) DeleteTaskLike(ctx context.Context, input model.DeleteTaskLikeInput) (*ent.TaskLike, error) {
	t, err := r.controller.TaskLike.Delete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskLikesDeleted {
			if u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TaskLike(ctx context.Context, where *ent.TaskLikeWhereInput) (*ent.TaskLike, error) {
	t, err := r.controller.TaskLike.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskLikes(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskLikeWhereInput) (*ent.TaskLikeConnection, error) {
	ts, err := r.controller.TaskLike.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TaskLikeCreated(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.TaskLike, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskLike, 1)

	r.mutex.Lock()
	r.subscriptions.TaskLikesCreated[key] = subscription.TaskLikesCreated{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskLikesCreated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskLikeDeleted(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.TaskLike, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskLike, 1)

	r.mutex.Lock()
	r.subscriptions.TaskLikesDeleted[key] = subscription.TaskLikesDeleted{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskLikesDeleted, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *taskLikeResolver) CreatedAt(ctx context.Context, obj *ent.TaskLike) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskLikeResolver) UpdatedAt(ctx context.Context, obj *ent.TaskLike) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskLike returns generated.TaskLikeResolver implementation.
func (r *Resolver) TaskLike() generated.TaskLikeResolver { return &taskLikeResolver{r} }

type taskLikeResolver struct{ *Resolver }
