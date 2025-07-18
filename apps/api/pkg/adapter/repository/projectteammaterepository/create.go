package projectteammaterepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *projectTeammateRepository) Create(ctx context.Context, input model.CreateProjectTeammateInput) (*model.ProjectTeammate, error) {
	res, err := r.client.
		ProjectTeammate.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
