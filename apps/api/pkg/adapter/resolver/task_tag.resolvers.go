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

func (r *mutationResolver) CreateTaskTag(ctx context.Context, input ent.CreateTaskTagInput) (*ent.TaskTag, error) {
	t, err := r.controller.TaskTag.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, c := range r.subscriptions.TaskTagCreated {
			if c.WorkspaceID == input.WorkspaceID && c.RequestID != input.RequestID {
				c.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) UpdateTaskTag(ctx context.Context, input ent.UpdateTaskTagInput) (*ent.TaskTag, error) {
	t, err := r.controller.TaskTag.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) DeleteTaskTag(ctx context.Context, input model.DeleteTaskTagInput) (*ent.TaskTag, error) {
	t, err := r.controller.TaskTag.Delete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, d := range r.subscriptions.TaskTagDeleted {
			if d.WorkspaceID == input.WorkspaceID && d.RequestID != input.RequestID {
				d.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TaskTag(ctx context.Context, where *ent.TaskTagWhereInput) (*ent.TaskTag, error) {
	t, err := r.controller.TaskTag.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *queryResolver) TaskTags(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskTagWhereInput) (*ent.TaskTagConnection, error) {
	ts, err := r.controller.TaskTag.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TaskTagsUpdated(ctx context.Context, taskID ulid.ID, requestID string) (<-chan []*ent.TaskTag, error) {
	key := subscription.NewKey()
	ch := make(chan []*ent.TaskTag, 1)

	r.mutex.Lock()
	r.subscriptions.TaskTagUpdated[key] = subscription.TaskTagUpdated{
		TaskID:    taskID,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskTagUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskTagCreated(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.TaskTag, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskTag, 1)

	r.mutex.Lock()
	r.subscriptions.TaskTagCreated[key] = subscription.TaskTagCreated{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskTagCreated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskTagDeleted(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.TaskTag, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TaskTag, 1)

	r.mutex.Lock()
	r.subscriptions.TaskTagDeleted[key] = subscription.TaskTagDeleted{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskTagDeleted, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *taskTagResolver) CreatedAt(ctx context.Context, obj *ent.TaskTag) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskTagResolver) UpdatedAt(ctx context.Context, obj *ent.TaskTag) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskTag returns generated.TaskTagResolver implementation.
func (r *Resolver) TaskTag() generated.TaskTagResolver { return &taskTagResolver{r} }

type taskTagResolver struct{ *Resolver }
