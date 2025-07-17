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

func (r *mutationResolver) CreateTeammateTask(ctx context.Context, input ent.CreateTeammateTaskInput) (*ent.TeammateTask, error) {
	t, err := r.controller.TeammateTask.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, c := range r.subscriptions.TeammateTaskCreated {
			if c.TeammateID == t.TeammateID && c.WorkspaceID == t.WorkspaceID && c.RequestID != input.RequestID {
				c.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) UpdateTeammateTask(ctx context.Context, input ent.UpdateTeammateTaskInput) (*ent.TeammateTask, error) {
	t, err := r.controller.TeammateTask.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.TeammateTaskUpdated {
			if u.TeammateID == t.TeammateID && u.WorkspaceID == t.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *mutationResolver) DeleteTeammateTask(ctx context.Context, input model.DeleteTeammateTaskInput) (*ent.TeammateTask, error) {
	t, err := r.controller.TeammateTask.Delete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, d := range r.subscriptions.TeammateTaskDeleted {
			if d.WorkspaceID == input.WorkspaceID && d.TeammateID == input.TeammateID && d.RequestID != input.RequestID {
				d.Ch <- t
			}
		}
	}()

	return t, nil
}

func (r *queryResolver) TeammateTask(ctx context.Context, where *ent.TeammateTaskWhereInput) (*ent.TeammateTask, error) {
	t, err := r.controller.TeammateTask.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TeammateTasks(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TeammateTaskWhereInput) (*ent.TeammateTaskConnection, error) {
	ts, err := r.controller.TeammateTask.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *queryResolver) TasksDueSoon(ctx context.Context, workspaceID ulid.ID, teammateID ulid.ID) ([]*ent.TeammateTask, error) {
	ts, err := r.controller.TeammateTask.TasksDueSoon(ctx, workspaceID, teammateID)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *subscriptionResolver) TeammateTaskUpdated(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *ent.TeammateTask, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTask, 1)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskUpdated[key] = subscription.TeammateTaskUpdated{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskCreated(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *ent.TeammateTask, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTask)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskCreated[key] = subscription.TeammateTaskCreated{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskCreated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) TeammateTaskDeleted(ctx context.Context, teammateID ulid.ID, workspaceID ulid.ID, requestID string) (<-chan *ent.TeammateTask, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.TeammateTask)

	r.mutex.Lock()
	r.subscriptions.TeammateTaskDeleted[key] = subscription.TeammateTaskDeleted{
		TeammateID:  teammateID,
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.TeammateTaskDeleted, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *teammateTaskResolver) CreatedAt(ctx context.Context, obj *ent.TeammateTask) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *teammateTaskResolver) UpdatedAt(ctx context.Context, obj *ent.TeammateTask) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TeammateTask returns generated.TeammateTaskResolver implementation.
func (r *Resolver) TeammateTask() generated.TeammateTaskResolver { return &teammateTaskResolver{r} }

type teammateTaskResolver struct{ *Resolver }
