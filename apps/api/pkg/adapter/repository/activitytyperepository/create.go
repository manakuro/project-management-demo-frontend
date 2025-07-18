package activitytyperepository

import (
	"context"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *activityTypeRepository) Create(ctx context.Context, input model.CreateActivityTypeInput) (*model.ActivityType, error) {
	res, err := r.client.
		ActivityType.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
