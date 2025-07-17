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

func (r *activityTypeResolver) CreatedAt(ctx context.Context, obj *ent.ActivityType) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *activityTypeResolver) UpdatedAt(ctx context.Context, obj *ent.ActivityType) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateActivityType(ctx context.Context, input ent.CreateActivityTypeInput) (*ent.ActivityType, error) {
	a, err := r.controller.ActivityType.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *mutationResolver) UpdateActivityType(ctx context.Context, input ent.UpdateActivityTypeInput) (*ent.ActivityType, error) {
	a, err := r.controller.ActivityType.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ActivityType(ctx context.Context, where *ent.ActivityTypeWhereInput) (*ent.ActivityType, error) {
	a, err := r.controller.ActivityType.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return a, nil
}

func (r *queryResolver) ActivityTypes(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ActivityTypeWhereInput) (*ent.ActivityTypeConnection, error) {
	as, err := r.controller.ActivityType.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return as, nil
}

// ActivityType returns generated.ActivityTypeResolver implementation.
func (r *Resolver) ActivityType() generated.ActivityTypeResolver { return &activityTypeResolver{r} }

type activityTypeResolver struct{ *Resolver }
