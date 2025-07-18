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

func (r *mutationResolver) CreateTaskActivityTask(ctx context.Context, input ent.CreateTaskActivityTaskInput) (*ent.TaskActivityTask, error) {
	t, err := r.controller.TaskActivityTask.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTaskActivityTask(ctx context.Context, input ent.UpdateTaskActivityTaskInput) (*ent.TaskActivityTask, error) {
	t, err := r.controller.TaskActivityTask.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *queryResolver) TaskActivityTask(ctx context.Context, where *ent.TaskActivityTaskWhereInput) (*ent.TaskActivityTask, error) {
	t, err := r.controller.TaskActivityTask.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *queryResolver) TaskActivityTasks(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskActivityTaskWhereInput) (*ent.TaskActivityTaskConnection, error) {
	ts, err := r.controller.TaskActivityTask.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ts, nil
}

func (r *taskActivityTaskResolver) CreatedAt(ctx context.Context, obj *ent.TaskActivityTask) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskActivityTaskResolver) UpdatedAt(ctx context.Context, obj *ent.TaskActivityTask) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskActivityTask returns generated.TaskActivityTaskResolver implementation.
func (r *Resolver) TaskActivityTask() generated.TaskActivityTaskResolver {
	return &taskActivityTaskResolver{r}
}

type taskActivityTaskResolver struct{ *Resolver }
