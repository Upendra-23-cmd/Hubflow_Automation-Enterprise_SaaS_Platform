resource "kubernetes_namespace" "hubflow" {
  metadata {
    name = var.namespace
  }
}