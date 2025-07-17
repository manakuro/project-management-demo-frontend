package model

import (
	"time"
)

// ArchivedActivity is the model entity for the ArchivedTaskActivity and ArchivedWorkspaceActivity.
type ArchivedActivity struct {
	ID        ID        `json:"id,omitempty"`
	Type      string    `json:"type,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
}

// ArchivedActivityWhereInput represents a where input for filtering queries.
type ArchivedActivityWhereInput struct {
	WorkspaceID ID `json:"workspaceId,omitempty"`
}
