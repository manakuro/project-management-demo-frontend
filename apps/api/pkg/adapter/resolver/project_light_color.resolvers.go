package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/util/datetime"
	"project-management-demo-backend/pkg/util/subscription"
)

func (r *mutationResolver) CreateProjectLightColor(ctx context.Context, input ent.CreateProjectLightColorInput) (*ent.ProjectLightColor, error) {
	p, err := r.controller.ProjectLightColor.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return p, nil
}

func (r *mutationResolver) UpdateProjectLightColor(ctx context.Context, input ent.UpdateProjectLightColorInput) (*ent.ProjectLightColor, error) {
	p, err := r.controller.ProjectLightColor.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.ProjectLightColorUpdated {
			if u.ID == p.ID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *projectLightColorResolver) CreatedAt(ctx context.Context, obj *ent.ProjectLightColor) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *projectLightColorResolver) UpdatedAt(ctx context.Context, obj *ent.ProjectLightColor) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *queryResolver) ProjectLightColor(ctx context.Context, where *ent.ProjectLightColorWhereInput) (*ent.ProjectLightColor, error) {
	p, err := r.controller.ProjectLightColor.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return p, nil
}

func (r *queryResolver) ProjectLightColors(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ProjectLightColorWhereInput) (*ent.ProjectLightColorConnection, error) {
	ps, err := r.controller.ProjectLightColor.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ps, nil
}

func (r *subscriptionResolver) ProjectLightColorUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.ProjectLightColor, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.ProjectLightColor, 1)

	r.mutex.Lock()
	r.subscriptions.ProjectLightColorUpdated[key] = subscription.ProjectLightColorUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.ProjectLightColorUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// ProjectLightColor returns generated.ProjectLightColorResolver implementation.
func (r *Resolver) ProjectLightColor() generated.ProjectLightColorResolver {
	return &projectLightColorResolver{r}
}

type projectLightColorResolver struct{ *Resolver }
