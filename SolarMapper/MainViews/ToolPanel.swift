import SwiftUI

struct ToolPanel: View {
    var onSelect: (Tool) -> Void

    var body: some View {
        HStack(spacing: 16) {
            ForEach(Tool.allCases) { tool in
                Button {
                    onSelect(tool)
                } label: {
                    VStack(spacing: 4) {
                        tool.iconName
                            .resizable()
                            .frame(width: 30, height: 30)
                        Text(tool.displayName)
                            .font(.caption2)
                    }
                    .padding(8)
                }
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 8)
        .glassEffect()
        .padding(.bottom, 24)
        .frame(maxWidth: .infinity, alignment: .center)
        .frame(maxHeight: .infinity, alignment: .bottom)
        .edgesIgnoringSafeArea(.bottom)
    }
}
