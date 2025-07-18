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

func (r *mutationResolver) CreateProjectTaskColumn(ctx context.Context, input ent.CreateProjectTaskColumnInput) (*ent.ProjectTaskColumn, error) {
	p, err := r.controller.ProjectTaskColumn.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return p, nil
}

func (r *mutationResolver) UpdateProjectTaskColumn(ctx context.Context, input ent.UpdateProjectTaskColumnInput) (*ent.ProjectTaskColumn, error) {
	p, err := r.controller.ProjectTaskColumn.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.ProjectTaskColumnUpdated {
			if u.ID == p.ID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *projectTaskColumnResolver) CreatedAt(ctx context.Context, obj *ent.ProjectTaskColumn) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *projectTaskColumnResolver) UpdatedAt(ctx context.Context, obj *ent.ProjectTaskColumn) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *queryResolver) ProjectTaskColumn(ctx context.Context, where *ent.ProjectTaskColumnWhereInput) (*ent.ProjectTaskColumn, error) {
	p, err := r.controller.ProjectTaskColumn.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return p, nil
}

func (r *queryResolver) ProjectTaskColumns(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ProjectTaskColumnWhereInput) (*ent.ProjectTaskColumnConnection, error) {
	ps, err := r.controller.ProjectTaskColumn.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ps, nil
}

func (r *subscriptionResolver) ProjectTaskColumnUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.ProjectTaskColumn, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.ProjectTaskColumn, 1)

	r.mutex.Lock()
	r.subscriptions.ProjectTaskColumnUpdated[key] = subscription.ProjectTaskColumnUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.ProjectTaskColumnUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// ProjectTaskColumn returns generated.ProjectTaskColumnResolver implementation.
func (r *Resolver) ProjectTaskColumn() generated.ProjectTaskColumnResolver {
	return &projectTaskColumnResolver{r}
}

type projectTaskColumnResolver struct{ *Resolver }
