package projecticonrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *projectIconRepository) Create(ctx context.Context, input model.CreateProjectIconInput) (*model.ProjectIcon, error) {
	res, err := r.client.
		ProjectIcon.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
