package archivedworkspaceacivitytaskrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *archivedWorkspaceActivityTaskRepository) Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error) {
	res, err := r.client.
		ArchivedWorkspaceActivityTask.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
