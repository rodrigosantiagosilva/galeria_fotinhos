import { ref } from 'vue'

export interface Foto {
  id: number
  caminho: string
}

export const fotos = ref<Foto[]>([])

export function adicionarFoto(
  caminho: string
) {

  fotos.value.push({
    id: Date.now(),
    caminho
  })

}

export function removerFoto(
  id: number
) {

  fotos.value = fotos.value.filter(
    foto => foto.id !== id
  )

}