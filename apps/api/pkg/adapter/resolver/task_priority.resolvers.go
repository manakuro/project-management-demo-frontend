package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/util/datetime"
)

func (r *mutationResolver) CreateTaskPriority(ctx context.Context, input ent.CreateTaskPriorityInput) (*ent.TaskPriority, error) {
	t, err := r.controller.TaskPriority.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTaskPriority(ctx context.Context, input ent.UpdateTaskPriorityInput) (*ent.TaskPriority, error) {
	t, err := r.controller.TaskPriority.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskPriority(ctx context.Context, where *ent.TaskPriorityWhereInput) (*ent.TaskPriority, error) {
	t, err := r.controller.TaskPriority.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskPriorities(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskPriorityWhereInput) (*ent.TaskPriorityConnection, error) {
	ts, err := r.controller.TaskPriority.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *taskPriorityResolver) CreatedAt(ctx context.Context, obj *ent.TaskPriority) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskPriorityResolver) UpdatedAt(ctx context.Context, obj *ent.TaskPriority) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskPriority returns generated.TaskPriorityResolver implementation.
func (r *Resolver) TaskPriority() generated.TaskPriorityResolver { return &taskPriorityResolver{r} }

type taskPriorityResolver struct{ *Resolver }
