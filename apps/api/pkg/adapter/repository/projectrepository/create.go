package projectrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *projectRepository) Create(ctx context.Context, input model.CreateProjectInput) (*model.Project, error) {
	res, err := r.client.
		Project.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
