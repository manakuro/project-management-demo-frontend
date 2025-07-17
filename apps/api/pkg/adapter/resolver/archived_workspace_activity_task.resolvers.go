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

func (r *archivedWorkspaceActivityTaskResolver) CreatedAt(ctx context.Context, obj *ent.ArchivedWorkspaceActivityTask) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *archivedWorkspaceActivityTaskResolver) UpdatedAt(ctx context.Context, obj *ent.ArchivedWorkspaceActivityTask) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateArchivedWorkspaceActivityTask(ctx context.Context, input ent.CreateArchivedWorkspaceActivityTaskInput) (*ent.ArchivedWorkspaceActivityTask, error) {
	a, err := r.controller.ArchivedWorkspaceActivityTask.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return a, nil
}

func (r *mutationResolver) UpdateArchivedWorkspaceActivityTask(ctx context.Context, input ent.UpdateArchivedWorkspaceActivityTaskInput) (*ent.ArchivedWorkspaceActivityTask, error) {
	a, err := r.controller.ArchivedWorkspaceActivityTask.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedWorkspaceActivityTask(ctx context.Context, where *ent.ArchivedWorkspaceActivityTaskWhereInput) (*ent.ArchivedWorkspaceActivityTask, error) {
	a, err := r.controller.ArchivedWorkspaceActivityTask.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedWorkspaceActivityTasks(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ArchivedWorkspaceActivityTaskWhereInput) (*ent.ArchivedWorkspaceActivityTaskConnection, error) {
	as, err := r.controller.ArchivedWorkspaceActivityTask.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return as, nil
}

// ArchivedWorkspaceActivityTask returns generated.ArchivedWorkspaceActivityTaskResolver implementation.
func (r *Resolver) ArchivedWorkspaceActivityTask() generated.ArchivedWorkspaceActivityTaskResolver {
	return &archivedWorkspaceActivityTaskResolver{r}
}

type archivedWorkspaceActivityTaskResolver struct{ *Resolver }
