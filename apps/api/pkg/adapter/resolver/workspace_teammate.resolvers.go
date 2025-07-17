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

func (r *mutationResolver) CreateWorkspaceTeammate(ctx context.Context, input ent.CreateWorkspaceTeammateInput) (*ent.WorkspaceTeammate, error) {
	w, err := r.controller.WorkspaceTeammate.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return w, nil
}

func (r *mutationResolver) UpdateWorkspaceTeammate(ctx context.Context, input ent.UpdateWorkspaceTeammateInput) (*ent.WorkspaceTeammate, error) {
	w, err := r.controller.WorkspaceTeammate.Update(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func() {
		for _, u := range r.subscriptions.WorkspaceTeammateUpdated {
			if u.ID == w.ID && u.RequestID != input.RequestID {
				u.Ch <- w
			}
		}
	}()

	return w, nil
}

func (r *queryResolver) WorkspaceTeammate(ctx context.Context, where *ent.WorkspaceTeammateWhereInput) (*ent.WorkspaceTeammate, error) {
	w, err := r.controller.WorkspaceTeammate.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return w, nil
}

func (r *queryResolver) WorkspaceTeammates(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.WorkspaceTeammateWhereInput) (*ent.WorkspaceTeammateConnection, error) {
	ws, err := r.controller.WorkspaceTeammate.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return ws, nil
}

func (r *subscriptionResolver) WorkspaceTeammateUpdated(ctx context.Context, id ulid.ID, requestID string) (<-chan *ent.WorkspaceTeammate, error) {
	key := subscription.NewKey()
	ch := make(chan *ent.WorkspaceTeammate, 1)

	r.mutex.Lock()
	r.subscriptions.WorkspaceTeammateUpdated[key] = subscription.WorkspaceTeammateUpdated{
		ID:        id,
		RequestID: requestID,
		Ch:        ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.WorkspaceTeammateUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

func (r *workspaceTeammateResolver) CreatedAt(ctx context.Context, obj *ent.WorkspaceTeammate) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *workspaceTeammateResolver) UpdatedAt(ctx context.Context, obj *ent.WorkspaceTeammate) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

// WorkspaceTeammate returns generated.WorkspaceTeammateResolver implementation.
func (r *Resolver) WorkspaceTeammate() generated.WorkspaceTeammateResolver {
	return &workspaceTeammateResolver{r}
}

type workspaceTeammateResolver struct{ *Resolver }
