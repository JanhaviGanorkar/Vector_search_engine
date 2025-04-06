PYTHON_VERSION := $(shell python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
REQUIRED_VERSION := 3.10

.PHONY: check-python
check-python:
	@if [ ! -f "$(shell which python$(REQUIRED_VERSION))" ]; then \
		echo "Python $(REQUIRED_VERSION) not found. Installing..."; \
		./scripts/setup-python.sh; \
	fi

.PHONY: run-connector
run-connector: check-python
	./scripts/run-connector.sh
