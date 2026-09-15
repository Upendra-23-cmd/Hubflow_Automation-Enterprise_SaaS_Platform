resource "kubernetes_config_map" "hubflow" {
  metadata {
    name      = "hubflow-config"
    namespace = kubernetes_namespace.hubflow.metadata[0].name
  }

  data = {
    NODE_ENV       = "production"
    PORT           = "3000"
    JWT_EXPIRES_IN = "1d"

    MYSQL_DATABASE = var.mysql_database
    MYSQL_USER     = var.mysql_user
  }
}