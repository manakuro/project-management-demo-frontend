package taskfilerepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskFileRepository) Create(ctx context.Context, input model.CreateTaskFileInput) (*model.TaskFile, error) {
	res, err := r.client.
		TaskFile.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
