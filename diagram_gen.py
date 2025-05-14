from graphviz import Digraph

dot = Digraph()

# Estilos para tipos de nós
default_style = {"shape": "ellipse", "style": "filled", "fillcolor": "lightgrey"}
module_style = {"shape": "box", "style": "filled", "fillcolor": "lightblue"}
ui_style = {"shape": "parallelogram", "style": "filled", "fillcolor": "lightyellow"}

# Nós
dot.node("camera", "Camera & Vision Node\n(vision_node)", **module_style)
dot.node("lidar", "LIDAR Node\n(lidar_node)", **module_style)
dot.node("speech", "Speech Recognition Node\n(speech_recognition_node)", **module_style)
dot.node("state", "State Manager Node\n(state_manager_node)", **default_style)
dot.node("ui", "UI Node\n(ui_node)", **ui_style)
dot.node("tts", "Text-to-Speech Node\n(text_to_speech_node)", **ui_style)
dot.node("arm", "Arm Control Node\n(arm_control_node)", **default_style)
dot.node("nav", "Navigation Node\n(navigation_node)", **default_style)
dot.node("people", "People Tracker Node\n(people_tracker_node)", **default_style)
dot.node("cmd", "Command Processor Node\n(command_processor_node)", **default_style)
dot.node(
    "chat", "Chat Node\n(chat_node)", shape="box", style="filled", fillcolor="plum"
)
dot.node(
    "object_coords",
    "Object Coordinates Node\n(object_coords_node)",
    shape="box",
    style="filled",
    fillcolor="lightgreen",
)
dot.edge("camera", "object_coords", "/object_detection")
dot.edge("object_coords", "cmd", "/object_coordinates")

dot.edge("chat", "cmd", "/chat_response")
dot.edge("cmd", "chat", "/chat_message")

# Conexões (arestas)
dot.edge("camera", "people", "/image_raw")
dot.edge("lidar", "nav", "/scan")
dot.edge("people", "nav", "/person_position")
dot.edge("camera", "cmd", "/faces_detected\n/people_detected")
dot.edge("speech", "cmd", "/speech_text")
dot.edge("state", "ui", "/robot_status")
dot.edge("cmd", "nav", "/goal_pose")
dot.edge("nav", "cmd", "/cmd_vel")
dot.edge("cmd", "arm", "/arm/goal_position")
dot.edge("cmd", "tts", "/speak")
dot.edge("cmd", "state", "/state_command")


# Renderizar
dot.attr(dpi="300")
dot.render("ros_nodes_diagram", format="png", cleanup=True)
