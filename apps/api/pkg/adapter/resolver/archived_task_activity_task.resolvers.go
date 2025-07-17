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

func (r *archivedTaskActivityTaskResolver) CreatedAt(ctx context.Context, obj *ent.ArchivedTaskActivityTask) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *archivedTaskActivityTaskResolver) UpdatedAt(ctx context.Context, obj *ent.ArchivedTaskActivityTask) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateArchivedTaskActivityTask(ctx context.Context, input ent.CreateArchivedTaskActivityTaskInput) (*ent.ArchivedTaskActivityTask, error) {
	a, err := r.controller.ArchivedTaskActivityTask.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return a, nil
}

func (r *mutationResolver) UpdateArchivedTaskActivityTask(ctx context.Context, input ent.UpdateArchivedTaskActivityTaskInput) (*ent.ArchivedTaskActivityTask, error) {
	a, err := r.controller.ArchivedTaskActivityTask.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedTaskActivityTask(ctx context.Context, where *ent.ArchivedTaskActivityTaskWhereInput) (*ent.ArchivedTaskActivityTask, error) {
	a, err := r.controller.ArchivedTaskActivityTask.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedTaskActivityTasks(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ArchivedTaskActivityTaskWhereInput) (*ent.ArchivedTaskActivityTaskConnection, error) {
	as, err := r.controller.ArchivedTaskActivityTask.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return as, nil
}

// ArchivedTaskActivityTask returns generated.ArchivedTaskActivityTaskResolver implementation.
func (r *Resolver) ArchivedTaskActivityTask() generated.ArchivedTaskActivityTaskResolver {
	return &archivedTaskActivityTaskResolver{r}
}

type archivedTaskActivityTaskResolver struct{ *Resolver }
