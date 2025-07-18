package workspaceacivitytaskrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *workspaceActivityTaskRepository) Create(ctx context.Context, input model.CreateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error) {
	res, err := r.client.
		WorkspaceActivityTask.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
