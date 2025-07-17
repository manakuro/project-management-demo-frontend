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

func (r *mutationResolver) CreateTaskListSortStatus(ctx context.Context, input ent.CreateTaskListSortStatusInput) (*ent.TaskListSortStatus, error) {
	t, err := r.controller.TaskListSortStatus.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTaskListSortStatus(ctx context.Context, input ent.UpdateTaskListSortStatusInput) (*ent.TaskListSortStatus, error) {
	t, err := r.controller.TaskListSortStatus.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskListSortStatus(ctx context.Context, where *ent.TaskListSortStatusWhereInput) (*ent.TaskListSortStatus, error) {
	t, err := r.controller.TaskListSortStatus.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskListSortStatuses(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskListSortStatusWhereInput) (*ent.TaskListSortStatusConnection, error) {
	ts, err := r.controller.TaskListSortStatus.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ts, nil
}

func (r *taskListSortStatusResolver) CreatedAt(ctx context.Context, obj *ent.TaskListSortStatus) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskListSortStatusResolver) UpdatedAt(ctx context.Context, obj *ent.TaskListSortStatus) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskListSortStatus returns generated.TaskListSortStatusResolver implementation.
func (r *Resolver) TaskListSortStatus() generated.TaskListSortStatusResolver {
	return &taskListSortStatusResolver{r}
}

type taskListSortStatusResolver struct{ *Resolver }
