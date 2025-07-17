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

func (r *mutationResolver) CreateProjectTaskListStatus(ctx context.Context, input ent.CreateProjectTaskListStatusInput) (*ent.ProjectTaskListStatus, error) {
	p, err := r.controller.ProjectTaskListStatus.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return p, nil
}

func (r *mutationResolver) UpdateProjectTaskListStatus(ctx context.Context, input ent.UpdateProjectTaskListStatusInput) (*ent.ProjectTaskListStatus, error) {
	p, err := r.controller.ProjectTaskListStatus.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.ProjectTaskListStatusUpdated {
			if u.ID == p.ID && u.RequestID != input.RequestID {
				u.Ch <- p
			}
		}
	}()

	return p, nil
}

func (r *projectTaskListStatusResolver) CreatedAt(ctx context.Context, obj *ent.ProjectTaskListStatus) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *projectTaskListStatusResolver) UpdatedAt(ctx context.Context, obj *ent.ProjectTaskListStatus) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *queryResolver) ProjectTaskListStatus(ctx context.Context, where *ent.ProjectTaskListStatusWhereInput) (*ent.ProjectTaskListStatus, error) {
	p, err := r.controller.ProjectTaskListStatus.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return p, nil
}

func (r *queryResolver) ProjectTaskListStatuses(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.ProjectTaskListStatusWhereInput) (*ent.ProjectTaskListStatusConnection, error) {
	ps, err := r.controller.ProjectTaskListStatus.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ps, nil
}

func (r *subscriptionResolver) ProjectTaskListStatusUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.ProjectTaskListStatus, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.ProjectTaskListStatus, 1)

	r.mutex.Lock()
	r.subscriptions.ProjectTaskListStatusUpdated[key] = subscription.ProjectTaskListStatusUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.ProjectTaskListStatusUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// ProjectTaskListStatus returns generated.ProjectTaskListStatusResolver implementation.
func (r *Resolver) ProjectTaskListStatus() generated.ProjectTaskListStatusResolver {
	return &projectTaskListStatusResolver{r}
}

type projectTaskListStatusResolver struct{ *Resolver }
