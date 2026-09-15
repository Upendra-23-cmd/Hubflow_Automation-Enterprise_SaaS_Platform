output "namespace" {
  value = kubernetes_namespace.hubflow.metadata[0].name
}

output "app_service" {
  value = kubernetes_service.app.metadata[0].name
}

output "mysql_service" {
  value = kubernetes_service.mysql.metadata[0].name
}

output "app_load_balancer" {
  value = try(
    kubernetes_service.app.status[0].load_balancer[0].ingress,
    []
  )
}