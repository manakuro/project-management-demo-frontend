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

func (r *deletedTaskResolver) CreatedAt(ctx context.Context, obj *ent.DeletedTask) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *deletedTaskResolver) UpdatedAt(ctx context.Context, obj *ent.DeletedTask) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateDeletedTask(ctx context.Context, input ent.CreateDeletedTaskInput) (*ent.DeletedTask, error) {
	d, err := r.controller.DeletedTask.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, c := range r.subscriptions.DeletedTaskCreated {
			if c.WorkspaceID == d.WorkspaceID && c.RequestID != input.RequestID {
				c.Ch <- d
			}
		}
	}()

	return d, nil
}

func (r *mutationResolver) UpdateDeletedTask(ctx context.Context, input ent.UpdateDeletedTaskInput) (*ent.DeletedTask, error) {
	d, err := r.controller.DeletedTask.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.DeletedTaskUpdated {
			if u.ID == d.ID && u.RequestID != input.RequestID {
				u.Ch <- d
			}
		}
	}()

	return d, nil
}

func (r *mutationResolver) UndeleteDeletedTask(ctx context.Context, input model.UndeleteDeletedTaskInput) ([]*ent.DeletedTask, error) {
	ds, err := r.controller.DeletedTask.Undelete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ds, nil
}

func (r *queryResolver) DeletedTask(ctx context.Context, where *ent.DeletedTaskWhereInput) (*ent.DeletedTask, error) {
	d, err := r.controller.DeletedTask.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return d, nil
}

func (r *queryResolver) DeletedTasks(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.DeletedTaskWhereInput) (*ent.DeletedTaskConnection, error) {
	ds, err := r.controller.DeletedTask.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ds, nil
}

func (r *subscriptionResolver) DeletedTaskUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.DeletedTask, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.DeletedTask, 1)

	r.mutex.Lock()
	r.subscriptions.DeletedTaskUpdated[key] = subscription.DeletedTaskUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.DeletedTaskUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *subscriptionResolver) DeletedTaskCreated(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.DeletedTask, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.DeletedTask, 1)

	r.mutex.Lock()
	r.subscriptions.DeletedTaskCreated[key] = subscription.DeletedTaskCreated{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.DeletedTaskCreated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// DeletedTask returns generated.DeletedTaskResolver implementation.
func (r *Resolver) DeletedTask() generated.DeletedTaskResolver { return &deletedTaskResolver{r} }

type deletedTaskResolver struct{ *Resolver }
