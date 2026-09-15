resource "kubernetes_secret" "hubflow" {
  metadata {
    name      = "hubflow-secrets"
    namespace = kubernetes_namespace.hubflow.metadata[0].name
  }

  type = "Opaque"

  data = {
    MYSQL_ROOT_PASSWORD = var.mysql_root_password
    MYSQL_PASSWORD      = var.mysql_password
    JWT_SECRET          = var.jwt_secret
  }
}