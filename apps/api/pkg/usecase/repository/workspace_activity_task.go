package repository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

// WorkspaceActivityTask is interface of repository
type WorkspaceActivityTask interface {
	Get(ctx context.Context, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTask, error)
	List(ctx context.Context) ([]*model.WorkspaceActivityTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTaskConnection, error)
	Create(ctx context.Context, input model.CreateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error)
	Update(ctx context.Context, input model.UpdateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error)
}
