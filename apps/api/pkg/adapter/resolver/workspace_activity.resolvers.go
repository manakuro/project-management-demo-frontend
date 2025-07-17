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

func (r *mutationResolver) CreateWorkspaceActivity(ctx context.Context, input ent.CreateWorkspaceActivityInput) (*ent.WorkspaceActivity, error) {
	w, err := r.controller.WorkspaceActivity.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return w, nil
}

func (r *mutationResolver) UpdateWorkspaceActivity(ctx context.Context, input ent.UpdateWorkspaceActivityInput) (*ent.WorkspaceActivity, error) {
	w, err := r.controller.WorkspaceActivity.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return w, nil
}

func (r *queryResolver) WorkspaceActivity(ctx context.Context, where *ent.WorkspaceActivityWhereInput) (*ent.WorkspaceActivity, error) {
	w, err := r.controller.WorkspaceActivity.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return w, nil
}

func (r *queryResolver) WorkspaceActivities(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.WorkspaceActivityWhereInput) (*ent.WorkspaceActivityConnection, error) {
	ws, err := r.controller.WorkspaceActivity.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ws, nil
}

func (r *workspaceActivityResolver) CreatedAt(ctx context.Context, obj *ent.WorkspaceActivity) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *workspaceActivityResolver) UpdatedAt(ctx context.Context, obj *ent.WorkspaceActivity) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// WorkspaceActivity returns generated.WorkspaceActivityResolver implementation.
func (r *Resolver) WorkspaceActivity() generated.WorkspaceActivityResolver {
	return &workspaceActivityResolver{r}
}

type workspaceActivityResolver struct{ *Resolver }
