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

func (r *mutationResolver) CreateTaskListCompletedStatus(ctx context.Context, input ent.CreateTaskListCompletedStatusInput) (*ent.TaskListCompletedStatus, error) {
	t, err := r.controller.TaskListCompletedStatus.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTaskListCompletedStatus(ctx context.Context, input ent.UpdateTaskListCompletedStatusInput) (*ent.TaskListCompletedStatus, error) {
	t, err := r.controller.TaskListCompletedStatus.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskListCompletedStatus(ctx context.Context, where *ent.TaskListCompletedStatusWhereInput) (*ent.TaskListCompletedStatus, error) {
	t, err := r.controller.TaskListCompletedStatus.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskListCompletedStatuses(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskListCompletedStatusWhereInput) (*ent.TaskListCompletedStatusConnection, error) {
	ts, err := r.controller.TaskListCompletedStatus.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ts, nil
}

func (r *taskListCompletedStatusResolver) CreatedAt(ctx context.Context, obj *ent.TaskListCompletedStatus) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskListCompletedStatusResolver) UpdatedAt(ctx context.Context, obj *ent.TaskListCompletedStatus) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskListCompletedStatus returns generated.TaskListCompletedStatusResolver implementation.
func (r *Resolver) TaskListCompletedStatus() generated.TaskListCompletedStatusResolver {
	return &taskListCompletedStatusResolver{r}
}

type taskListCompletedStatusResolver struct{ *Resolver }
