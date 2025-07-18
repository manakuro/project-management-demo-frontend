package projecttaskcolumnrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *projectTaskColumnRepository) Create(ctx context.Context, input model.CreateProjectTaskColumnInput) (*model.ProjectTaskColumn, error) {
	res, err := r.client.
		ProjectTaskColumn.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
