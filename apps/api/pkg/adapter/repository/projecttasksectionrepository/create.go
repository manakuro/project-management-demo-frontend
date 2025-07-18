package projecttasksectionrepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *projectTaskSectionRepository) Create(ctx context.Context, input model.CreateProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	res, err := r.client.
		ProjectTaskSection.
		Create().
		SetInput(input).
		SetName("").
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
