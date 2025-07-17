package workspaceacivityrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *workspaceActivityRepository) Create(ctx context.Context, input model.CreateWorkspaceActivityInput) (*model.WorkspaceActivity, error) {
	res, err := r.client.
		WorkspaceActivity.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
