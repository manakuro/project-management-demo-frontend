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

func (r *mutationResolver) CreateWorkspaceActivityTask(ctx context.Context, input ent.CreateWorkspaceActivityTaskInput) (*ent.WorkspaceActivityTask, error) {
	w, err := r.controller.WorkspaceActivityTask.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return w, nil
}

func (r *mutationResolver) UpdateWorkspaceActivityTask(ctx context.Context, input ent.UpdateWorkspaceActivityTaskInput) (*ent.WorkspaceActivityTask, error) {
	w, err := r.controller.WorkspaceActivityTask.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return w, nil
}

func (r *queryResolver) WorkspaceActivityTask(ctx context.Context, where *ent.WorkspaceActivityTaskWhereInput) (*ent.WorkspaceActivityTask, error) {
	w, err := r.controller.WorkspaceActivityTask.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return w, nil
}

func (r *queryResolver) WorkspaceActivityTasks(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.WorkspaceActivityTaskWhereInput) (*ent.WorkspaceActivityTaskConnection, error) {
	ws, err := r.controller.WorkspaceActivityTask.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ws, nil
}

func (r *workspaceActivityTaskResolver) CreatedAt(ctx context.Context, obj *ent.WorkspaceActivityTask) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *workspaceActivityTaskResolver) UpdatedAt(ctx context.Context, obj *ent.WorkspaceActivityTask) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// WorkspaceActivityTask returns generated.WorkspaceActivityTaskResolver implementation.
func (r *Resolver) WorkspaceActivityTask() generated.WorkspaceActivityTaskResolver {
	return &workspaceActivityTaskResolver{r}
}

type workspaceActivityTaskResolver struct{ *Resolver }
