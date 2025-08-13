import SwiftUI

struct ShapeLayer: Identifiable {
    let id = UUID()
    var rect: CGRect
    var isSelected: Bool = false
}

struct ZoomableView<Content: View>: View {
    let minScale: CGFloat = 0.5
    let maxScale: CGFloat = 3.0
    let overflow: CGFloat = 100
    let content: Content

    @Binding var scale: CGFloat
    @State private var offset: CGSize = .zero

    @GestureState private var gestureScale: CGFloat = 1.0
    @GestureState private var gestureDragOffset: CGSize = .zero

    init(scale: Binding<CGFloat>, @ViewBuilder content: () -> Content) {
        self._scale = scale
        self.content = content()
    }

    var body: some View {
        GeometryReader { geometry in
            let currentScale = scale * gestureScale
            let clampedScale = min(max(currentScale, minScale), maxScale)

            // Calculate max allowed offset based on scale & size
            let maxX = max((geometry.size.width * (clampedScale - 1)) / 2 + overflow, 0)
            let maxY = max((geometry.size.height * (clampedScale - 1)) / 2 + overflow, 0)

            // Combine offsets
            let totalOffset = CGSize(
                width: offset.width + gestureDragOffset.width,
                height: offset.height + gestureDragOffset.height
            )

            // Clamp offset to bounds
            let clampedOffset = CGSize(
                width: min(max(totalOffset.width, -maxX), maxX),
                height: min(max(totalOffset.height, -maxY), maxY)
            )

            let magnification = MagnificationGesture()
                .updating($gestureScale) { value, state, _ in
                    let clamped = min(max(scale * value, minScale), maxScale) / scale
                    state = clamped
                }
                .onEnded { value in
                    let newScale = scale * value
                    scale = min(max(newScale, minScale), maxScale)
                    // Optional: reset offset when scale changes drastically? (or keep)
                }

            let drag = DragGesture()
                .updating($gestureDragOffset) { value, state, _ in
                    state = value.translation
                }
                .onEnded { value in
                    let proposed = CGSize(width: offset.width + value.translation.width, height: offset.height + value.translation.height)
                    offset = CGSize(
                        width: min(max(proposed.width, -maxX), maxX),
                        height: min(max(proposed.height, -maxY), maxY)
                    )
                }

            content
                .scaleEffect(clampedScale)
                .offset(clampedOffset)
                .frame(width: geometry.size.width, height: geometry.size.height)
                .clipped()
                .gesture(drag.simultaneously(with: magnification))
        }
    }
}
