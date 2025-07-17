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

func (r *mutationResolver) CreateProject(ctx context.Context, input ent.CreateProjectInput) (*ent.Project, error) {
	p, err := r.controller.Project.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return p, nil
}

func (r *mutationResolver) UpdateProject(ctx context.Context, input ent.UpdateProjectInput) (*ent.Project, error) {
	p, err := r.controller.Project.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.ProjectUpdated {
			if u.WorkspaceID == *input.WorkspaceID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *projectResolver) TeammateIds(ctx context.Context, obj *ent.Project) ([]string, error) {
	projectTeammates, err := obj.ProjectTeammates(ctx)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	ids := make([]string, len(projectTeammates))
	for i, pt := range projectTeammates {
		ids[i] = string(pt.TeammateID)
	}

	return ids, nil
}

func (r *projectResolver) DueDate(ctx context.Context, obj *ent.Project) (string, error) {
	if obj.DueDate == nil {
		return "", nil
	}

	return datetime.FormatDate(*obj.DueDate), nil
}

func (r *projectResolver) CreatedAt(ctx context.Context, obj *ent.Project) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *projectResolver) UpdatedAt(ctx context.Context, obj *ent.Project) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *queryResolver) Project(ctx context.Context, where *ent.ProjectWhereInput) (*ent.Project, error) {
	p, err := r.controller.Project.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return p, nil
}

func (r *queryResolver) Projects(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ProjectWhereInput) (*ent.ProjectConnection, error) {
	ps, err := r.controller.Project.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ps, nil
}

func (r *subscriptionResolver) ProjectUpdated(ctx context.Context, workspaceID ulid.ID, requestID string) (<-chan *ent.Project, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.Project, 1)

	r.mutex.Lock()
	r.subscriptions.ProjectUpdated[key] = subscription.ProjectUpdated{
		WorkspaceID: workspaceID,
		RequestID:   requestID,
		Ch:          ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.ProjectUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// Project returns generated.ProjectResolver implementation.
func (r *Resolver) Project() generated.ProjectResolver { return &projectResolver{r} }

type projectResolver struct{ *Resolver }
