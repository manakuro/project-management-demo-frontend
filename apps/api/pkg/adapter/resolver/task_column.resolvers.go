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

func (r *mutationResolver) CreateTaskColumn(ctx context.Context, input ent.CreateTaskColumnInput) (*ent.TaskColumn, error) {
	t, err := r.controller.TaskColumn.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return t, nil
}

func (r *mutationResolver) UpdateTaskColumn(ctx context.Context, input ent.UpdateTaskColumnInput) (*ent.TaskColumn, error) {
	t, err := r.controller.TaskColumn.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	for _, u := range r.subscriptions.TaskColumnUpdated {
		if u.ID == t.ID {
			u.Ch <- t
		}
	}

	return t, nil
}

func (r *queryResolver) TaskColumn(ctx context.Context, where *ent.TaskColumnWhereInput) (*ent.TaskColumn, error) {
	t, err := r.controller.TaskColumn.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return t, nil
}

func (r *queryResolver) TaskColumns(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.TaskColumnWhereInput) (*ent.TaskColumnConnection, error) {
	ts, err := r.controller.TaskColumn.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ts, nil
}

func (r *taskColumnResolver) CreatedAt(ctx context.Context, obj *ent.TaskColumn) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *taskColumnResolver) UpdatedAt(ctx context.Context, obj *ent.TaskColumn) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// TaskColumn returns generated.TaskColumnResolver implementation.
func (r *Resolver) TaskColumn() generated.TaskColumnResolver { return &taskColumnResolver{r} }

type taskColumnResolver struct{ *Resolver }
