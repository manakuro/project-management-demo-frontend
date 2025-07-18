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

func (r *archivedTaskActivityResolver) CreatedAt(ctx context.Context, obj *ent.ArchivedTaskActivity) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *archivedTaskActivityResolver) UpdatedAt(ctx context.Context, obj *ent.ArchivedTaskActivity) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateArchivedTaskActivity(ctx context.Context, input ent.CreateArchivedTaskActivityInput) (*ent.ArchivedTaskActivity, error) {
	a, err := r.controller.ArchivedTaskActivity.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return a, nil
}

func (r *mutationResolver) UpdateArchivedTaskActivity(ctx context.Context, input ent.UpdateArchivedTaskActivityInput) (*ent.ArchivedTaskActivity, error) {
	a, err := r.controller.ArchivedTaskActivity.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedTaskActivity(ctx context.Context, where *ent.ArchivedTaskActivityWhereInput) (*ent.ArchivedTaskActivity, error) {
	a, err := r.controller.ArchivedTaskActivity.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ArchivedTaskActivities(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ArchivedTaskActivityWhereInput) (*ent.ArchivedTaskActivityConnection, error) {
	as, err := r.controller.ArchivedTaskActivity.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return as, nil
}

// ArchivedTaskActivity returns generated.ArchivedTaskActivityResolver implementation.
func (r *Resolver) ArchivedTaskActivity() generated.ArchivedTaskActivityResolver {
	return &archivedTaskActivityResolver{r}
}

type archivedTaskActivityResolver struct{ *Resolver }
