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

func (r *archivedWorkspaceActivityResolver) CreatedAt(ctx context.Context, obj *ent.ArchivedWorkspaceActivity) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *archivedWorkspaceActivityResolver) UpdatedAt(ctx context.Context, obj *ent.ArchivedWorkspaceActivity) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateArchivedWorkspaceActivity(ctx context.Context, input ent.CreateArchivedWorkspaceActivityInput) (*ent.ArchivedWorkspaceActivity, error) {
	a, err := r.controller.ArchivedWorkspaceActivity.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return a, nil
}

func (r *mutationResolver) UpdateArchivedWorkspaceActivity(ctx context.Context, input ent.UpdateArchivedWorkspaceActivityInput) (*ent.ArchivedWorkspaceActivity, error) {
	a, err := r.controller.ArchivedWorkspaceActivity.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedWorkspaceActivity(ctx context.Context, where *ent.ArchivedWorkspaceActivityWhereInput) (*ent.ArchivedWorkspaceActivity, error) {
	a, err := r.controller.ArchivedWorkspaceActivity.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedWorkspaceActivities(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ArchivedWorkspaceActivityWhereInput) (*ent.ArchivedWorkspaceActivityConnection, error) {
	as, err := r.controller.ArchivedWorkspaceActivity.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return as, nil
}

// ArchivedWorkspaceActivity returns generated.ArchivedWorkspaceActivityResolver implementation.
func (r *Resolver) ArchivedWorkspaceActivity() generated.ArchivedWorkspaceActivityResolver {
	return &archivedWorkspaceActivityResolver{r}
}

type archivedWorkspaceActivityResolver struct{ *Resolver }
