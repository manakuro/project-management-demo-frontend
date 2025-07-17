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

func (r *mutationResolver) CreateProjectIcon(ctx context.Context, input ent.CreateProjectIconInput) (*ent.ProjectIcon, error) {
	pi, err := r.controller.ProjectIcon.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return pi, nil
}

func (r *mutationResolver) UpdateProjectIcon(ctx context.Context, input ent.UpdateProjectIconInput) (*ent.ProjectIcon, error) {
	pi, err := r.controller.ProjectIcon.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.ProjectIconUpdated {
			if u.ID == pi.ID && u.RequestID != input.RequestID {
				u.Ch <- pi
			}
		}
	}()

	return pi, nil
}

func (r *projectIconResolver) CreatedAt(ctx context.Context, obj *ent.ProjectIcon) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *projectIconResolver) UpdatedAt(ctx context.Context, obj *ent.ProjectIcon) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *queryResolver) ProjectIcon(ctx context.Context, where *ent.ProjectIconWhereInput) (*ent.ProjectIcon, error) {
	pi, err := r.controller.ProjectIcon.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return pi, nil
}

func (r *queryResolver) ProjectIcons(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ProjectIconWhereInput) (*ent.ProjectIconConnection, error) {
	pis, err := r.controller.ProjectIcon.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return pis, nil
}

func (r *subscriptionResolver) ProjectIconUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.ProjectIcon, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.ProjectIcon, 1)

	r.mutex.Lock()
	r.subscriptions.ProjectIconUpdated[key] = subscription.ProjectIconUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.ProjectIconUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// ProjectIcon returns generated.ProjectIconResolver implementation.
func (r *Resolver) ProjectIcon() generated.ProjectIconResolver { return &projectIconResolver{r} }

type projectIconResolver struct{ *Resolver }
