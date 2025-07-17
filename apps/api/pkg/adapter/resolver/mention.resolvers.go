package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *queryResolver) Mentions(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error) {
	ms, err := r.controller.Mention.List(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ms, nil
}
