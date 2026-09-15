variable "app_image" {
  type = string
  
}

variable "app_replicas" {
  type    = number
  default = 2
}

variable "mysql_database" {
  type    = string
  default = "hubflow_db"
}

variable "mysql_user" {
  type    = string
  default = "hubflow_user"
}

variable "mysql_password" {
  type      = string
  sensitive = true
}

variable "mysql_root_password" {
  type      = string
  sensitive = true
}

