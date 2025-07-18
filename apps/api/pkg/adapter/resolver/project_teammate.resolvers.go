package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/util/datetime"
	"project-management-demo-backend/pkg/util/subscription"
)

func (r *mutationResolver) CreateProjectTeammate(ctx context.Context, input ent.CreateProjectTeammateInput) (*ent.ProjectTeammate, error) {
	p, err := r.controller.ProjectTeammate.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return p, nil
}

func (r *mutationResolver) UpdateProjectTeammate(ctx context.Context, input ent.UpdateProjectTeammateInput) (*ent.ProjectTeammate, error) {
	p, err := r.controller.ProjectTeammate.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.ProjectTeammateUpdated {
			if u.ID == p.ID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *mutationResolver) UpdateProjectTeammateOwner(ctx context.Context, input model.UpdateProjectTeammateOwnerInput) (*ent.ProjectTeammate, error) {
	p, err := r.controller.ProjectTeammate.UpdateOwner(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return p, nil
}

func (r *projectTeammateResolver) CreatedAt(ctx context.Context, obj *ent.ProjectTeammate) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *projectTeammateResolver) UpdatedAt(ctx context.Context, obj *ent.ProjectTeammate) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *queryResolver) ProjectTeammate(ctx context.Context, where *ent.ProjectTeammateWhereInput) (*ent.ProjectTeammate, error) {
	p, err := r.controller.ProjectTeammate.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return p, nil
}

func (r *queryResolver) ProjectTeammates(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ProjectTeammateWhereInput) (*ent.ProjectTeammateConnection, error) {
	ps, err := r.controller.ProjectTeammate.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ps, nil
}

func (r *subscriptionResolver) ProjectTeammateUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.ProjectTeammate, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.ProjectTeammate, 1)

	r.mutex.Lock()
	r.subscriptions.ProjectTeammateUpdated[key] = subscription.ProjectTeammateUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.ProjectTeammateUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// ProjectTeammate returns generated.ProjectTeammateResolver implementation.
func (r *Resolver) ProjectTeammate() generated.ProjectTeammateResolver {
	return &projectTeammateResolver{r}
}

type projectTeammateResolver struct{ *Resolver }
