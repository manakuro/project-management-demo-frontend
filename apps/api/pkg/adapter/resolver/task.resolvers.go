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

func (r *mutationResolver) CreateTask(ctx context.Context, input ent.CreateTaskInput) (*ent.Task, error) {
	t, err := r.controller.Task.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) UpdateTask(ctx context.Context, input ent.UpdateTaskInput) (*ent.Task, error) {
	t, err := r.controller.Task.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskUpdated {
			if u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) DeleteTask(ctx context.Context, input model.DeleteTaskInput) (*model.DeleteTaskPayload, error) {
	p, err := r.controller.Task.Delete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, d := range r.subscriptions.TaskDeleted {
			if d.WorkspaceID == input.WorkspaceID && d.RequestID != input.RequestID {
				d.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *mutationResolver) DeleteAllTask(ctx context.Context, input model.DeleteAllTaskInput) (*model.DeleteAllTaskPayload, error) {
	p, err := r.controller.Task.DeleteAll(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return p, nil
}

func (r *mutationResolver) UndeleteTask(ctx context.Context, input model.UndeleteTaskInput) (*model.UndeleteTaskPayload, error) {
	p, err := r.controller.Task.Undelete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskUndeleted {
			if u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *mutationResolver) AssignTask(ctx context.Context, input model.AssignTaskInput) (*model.AssignTaskPayload, error) {
	p, err := r.controller.Task.Assign(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, a := range r.subscriptions.TaskAssigned {
			if a.WorkspaceID == input.WorkspaceID && a.RequestID != input.RequestID {
				a.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *mutationResolver) UnassignTask(ctx context.Context, input model.UnassignTaskInput) (*model.UnassignTaskPayload, error) {
	p, err := r.controller.Task.Unassign(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TaskUnassigned {
			if u.WorkspaceID == input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *queryResolver) Task(ctx context.Context, where *ent.TaskWhereInput) (*ent.Task, error) {
	t, err := r.controller.Task.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) Tasks(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskWhereInput) (*ent.TaskConnection, error) {
	ts, err := r.controller.Task.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TaskUpdated(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.Task, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.Task, 1)

	r.mutex.Lock()
	r.subscriptions.TaskUpdated[key] = subscription.TaskUpdated{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskDeleted(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *model.DeleteTaskPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.DeleteTaskPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TaskDeleted[key] = subscription.TaskDeleted{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskDeleted, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskUndeleted(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *model.UndeleteTaskPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.UndeleteTaskPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TaskUndeleted[key] = subscription.TaskUndeleted{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskUndeleted, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskAssigned(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *model.AssignTaskPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.AssignTaskPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TaskAssigned[key] = subscription.TaskAssigned{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskAssigned, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TaskUnassigned(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *model.UnassignTaskPayload, error) {
	key := subscription.NewKey()
	ch := make(chan *model.UnassignTaskPayload, 1)

	r.mutex.Lock()
	r.subscriptions.TaskUnassigned[key] = subscription.TaskUnassigned{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TaskUnassigned, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *taskResolver) CompletedAt(ctx context.Context, obj *ent.Task) (string, error) {
	if obj.CompletedAt == nil {
		return "", nil
	}

	return datetime.FormatDate(*obj.CompletedAt), nil
}

func (r *taskResolver) DueDate(ctx context.Context, obj *ent.Task) (string, error) {
	if obj.DueDate == nil {
		return "", nil
	}

	return datetime.FormatDate(*obj.DueDate), nil
}

func (r *taskResolver) DueTime(ctx context.Context, obj *ent.Task) (string, error) {
	if obj.DueTime == nil {
		return "", nil
	}

	return datetime.FormatDate(*obj.DueTime), nil
}

func (r *taskResolver) CreatedAt(ctx context.Context, obj *ent.Task) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskResolver) UpdatedAt(ctx context.Context, obj *ent.Task) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// Task returns generated.TaskResolver implementation.
func (r *Resolver) Task() generated.TaskResolver { return &taskResolver{r} }

type taskResolver struct{ *Resolver }
