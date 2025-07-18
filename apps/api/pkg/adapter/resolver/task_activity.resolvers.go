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

func (r *mutationResolver) CreateTaskActivity(ctx context.Context, input ent.CreateTaskActivityInput) (*ent.TaskActivity, error) {
	t, err := r.controller.TaskActivity.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *mutationResolver) UpdateTaskActivity(ctx context.Context, input ent.UpdateTaskActivityInput) (*ent.TaskActivity, error) {
	t, err := r.controller.TaskActivity.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *queryResolver) TaskActivity(ctx context.Context, where *ent.TaskActivityWhereInput) (*ent.TaskActivity, error) {
	t, err := r.controller.TaskActivity.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *queryResolver) TaskActivities(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskActivityWhereInput) (*ent.TaskActivityConnection, error) {
	ts, err := r.controller.TaskActivity.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ts, nil
}

func (r *taskActivityResolver) CreatedAt(ctx context.Context, obj *ent.TaskActivity) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskActivityResolver) UpdatedAt(ctx context.Context, obj *ent.TaskActivity) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskActivity returns generated.TaskActivityResolver implementation.
func (r *Resolver) TaskActivity() generated.TaskActivityResolver { return &taskActivityResolver{r} }

type taskActivityResolver struct{ *Resolver }
